# solid-new-bucket
SolidJS Signal Utils

## Usage

### Bucket

Create a bucket to track data:
```
import { bucket } from 'solid-new-bucket'

const value = bucket('test data')
```

Access bucket's reactive value in SolidJS:
```
function myComponent() {
  const value = bucket('test data')

  return (
    <div>
      This is {value()}
    </div>
  )
}
```

Update bucket's content:
```
// Provide value directly
const value = bucket('test data')
value('new data')
console.log(value())
// expected to be: 'new data'

// Provide a consumer function
value(prevValue => 'updated: ' + prevValue)
console.log(value())
// expected to be: 'updated: test data'
```

Save bucket's content to local storage:
```
const value = bucket(new Date(), {
  localStorageName: 'user.loginAt'
})
```
With ``localStorageName``, bucket sync it's content with local storage automatically.

Update listener:
```
const value = bucket(1, {
  beforeUpdate(newValue) {
    console.log('going to update to', newValue)
  },
  afterUpdate(newValue) {
    console.log('now is', newValue)
  }
})
```

Use Bucket as downstream of an accessor:
```
const [upstream, updateUpstream] = createSignal('test data')
const value = bucket(upstream, {
  useValueAsAccessor: true
})
updateUpstream('new data')
console.log(value())
// expected to be: 'new data'
```

### StampedBucket

StampedBucket helps to track changes on Object, Array and other complex types.

Create, update and access:
```
const v = stampedBucket(new Set())
v(content => {
  content.add(1)
})
console.log(v())
// expected to be: Set(1) { 1 }
```

Replace content:
```
const v = stampedBucket([1,2,3])
console.log(v())
// expected to be: [1, 2, 3]

const newSet = new Set()
newSet.add(-1)

v.reset(newSet)
console.log(v())
// expected to be: Set(1) { -1 }
```

If state is updated outside stampedBucket, we can mark state is changed to let solidjs trigger calculation on update:
```
const arr = [1,2]
const v = stampedBucket(arr)

// update the array directly
arr.push(3)
v.markChanged()
```

StampedBucket supports update listener and localStorage sync as well as Bucket.

---

SolidJS状态管理API。

## 用法

### Bucket

创建一个 bucket 来管理数据：
```
import { bucket } from 'solid-new-bucket'

const value = bucket('test data')
```

访问 bucket：
```
function myComponent() {
  const value = bucket('test data')

  return (
    <div>
      This is {value()}
    </div>
  )
}
```

更新 bucket 内容：
```
const value = bucket('test data')
// 直接穿参更新
value('new data')
console.log(value())
// 期望输出: 'new data'

// 传入更新函数
value(prevValue => 'updated: ' + prevValue)
console.log(value())
// 期望输出: 'updated: test data'
```

配置 bucket 自动保存数据到浏览器本地存储：
```
const value = bucket(new Date(), {
  localStorageName: 'user.loginAt'
})
```

配置更新监听回调：
```
const value = bucket(1, {
  beforeUpdate(newValue) {
    console.log('即将更新为：', newValue)
  },
  afterUpdate(newValue) {
    console.log('当前值：', newValue)
  }
})
```

将 accessor 和 Bucket 串联：
```
const [upstream, updateUpstream] = createSignal('test data')
const value = bucket(upstream, {
  useValueAsAccessor: true
})
updateUpstream('new data')
console.log(value())
// 期望输出: 'new data'
```

### StampedBucket

StampedBucket 用来管理对象、数组或者其他复杂类型的状态。

创建、更新和访问:
```
const v = stampedBucket(new Set())
v(content => {
  content.add(1)
})
console.log(v())
// 期望输出: Set(1) { 1 }
```

替换对象：
```
const v = stampedBucket([1,2,3])
console.log(v())
// 期望输出: [1, 2, 3]

const newSet = new Set()
newSet.add(-1)

v.reset(newSet)
console.log(v())
// 期望输出: Set(1) { -1 }
```

如果没有通过 stampedBucket 去更新状态，可以标记状态已更新让 solidjs 重新渲染：
```
const arr = [1,2]
const v = stampedBucket(arr)

// 直接更新数组
arr.push(3)
v.markChanged()
```

StampedBucket 也支持更新监听回调和本地存储同步。
