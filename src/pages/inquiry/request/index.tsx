import './style.scss'

import { Button, LineInput } from '@/components/ui'
import { useEffect, useRef, useState } from 'react'

import Body from '@/layouts/BaseLayout/Body'
import { EodiroPage } from '@/pages/_app'
import Head from 'next/head'
import { InquiryApi } from '@/api'

const InquiryRequestPage: EodiroPage<void> = () => {
  const [title, setTitle] = useState('')
  const [email, setEmail] = useState('')
  const [body, setBody] = useState('')
  const [isSubmitted, setIsSbumitted] = useState(false)

  const titleRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  function focusTitle(): void {
    titleRef.current.focus()
  }

  function focusEmail(): void {
    emailRef.current.focus()
  }

  function focusBody(): void {
    bodyRef.current.focus()
  }

  function isValidTitle(value: string): boolean {
    if (value.length > 0 && value.length <= 100) {
      return true
    }
    return false
  }
  function isValidEmail(value: string): boolean {
    const emailRegExp = new RegExp(
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    )
    const results = emailRegExp.exec(value)
    return results && results.length > 0
  }
  function isValidBody(value: string): boolean {
    if (value.length > 0) {
      return true
    }
    return false
  }
  async function submit(): Promise<void> {
    if (isSubmitted) {
      return
    }
    setIsSbumitted(true)
    if (!isValidTitle(title)) {
      alert('제목을 입력해주세요.')
      titleRef.current.focus()
    } else if (!isValidEmail(email)) {
      alert('이메일을 확인해주세요.')
      emailRef.current.focus()
    } else if (!isValidBody(body)) {
      alert('문의 내용을 적어주세요.')
      bodyRef.current.focus()
    } else {
      const result = await InquiryApi.post(title, body, email)
      if (result) {
        alert('정상적으로 처리되었습니다.')
        window.location.href = '/inquiry'
      } else {
        alert('서버에 문제가 발생했습니다.')
      }
    }
    setIsSbumitted(false)
  }
  useEffect(() => {
    focusTitle()
  }, [])

  return (
    <>
      <Head>
        <title>문의하기</title>
      </Head>
      <Body
        hasTopGap
        pageTitle="문의하기"
        bodyClassName="eodiro-inquiry-request-body"
        centered
      >
        <div id="eodiro-inquiry-request">
          <LineInput
            ref={titleRef}
            className="title-field"
            placeholder="제목"
            value={title}
            setValue={setTitle}
            onEnter={focusEmail}
            disabled={isSubmitted}
          />
          <LineInput
            ref={emailRef}
            className="email-field"
            placeholder="email"
            value={email}
            setValue={setEmail}
            onEnter={focusBody}
            disabled={isSubmitted}
          />
          <textarea
            ref={bodyRef}
            className="body-field"
            name="body"
            placeholder="문의내용"
            value={body}
            onChange={(e): void => {
              setBody(e.target.value)
            }}
            disabled={isSubmitted}
          ></textarea>
          <Button
            full
            label={'제출'}
            className="submit-button"
            onClick={submit}
            disabled={isSubmitted}
            accent="yellow"
          />
        </div>
      </Body>
    </>
  )
}
export default InquiryRequestPage
