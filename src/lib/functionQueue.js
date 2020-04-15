import Queue from 'js-queue'

export default class FunctionQueue {
  constructor (consumer) {
    this.consumer = consumer
    this.queue = new Queue()
  }

  add (obj) {
    this.queue.add(this._consumer.bind(this, obj))
  }

  clear () {
    this.queue.clear()
  }

  size () {
    return this.queue.contents.length
  }

  _consumer (obj) {
    this.consumer(obj)
    setTimeout(this.queue.next.bind(this))
  }
}
