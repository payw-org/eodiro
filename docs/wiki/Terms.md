## eodiro

It is our software's name. "어디로" in Korean.


## Hamlets

**_Hamlets_** indicate top level functionalities listed in the eodiro's home page, including home itself. Each App has its own icon and the [Banner](Banner) is large on these Apps' starting page. Banner becomes a mini mode at further children routes.


### Hamlet Name

They consist of lowercase and concatenated with a dash(-) because they are also frequently used in the html document as a class name.

- home
- vacant
- lectures
- clubs
- cafeteria
- inquiry
- donation
- preferences


## Banner

[See more](Banner)

## (⚠️ Important) Page Component Name

All the Vue components under `pages` directory should have their own **_unique_** names to be properly cached. You can simply create this name by following the rule.

### Naming Rule

Concatenate directory/file names sequentially with "-". Since routes are unique, also this naming rule generates unique component names.

**Examples**

- `/pages/community/_postId.vue` -> `_postId.vue`'s name should be `community-postId`.
- `/pages/preferences/index.vue` -> `index.vue`'s name should be `preferences-index`.
- `/pages/vacant/_buildingId/_floorId.vue` -> `_floorId.vue`'s name should be `vacant-buildingId-floorId`.

```javascript
export default {
  name: 'vacant-buildingId-floorId'
}
```