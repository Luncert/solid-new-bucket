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

Create a StampedBucket:
```
const set = stampedBucket(new Set())
```

Update and access:
```
set(content => {
  content.add(1)
})
console.log(set())
// expected to be: Set(1) { 1 }
```

StampedBucket supports update listener and localStorage sync as well as Bucket.