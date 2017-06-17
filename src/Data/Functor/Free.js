import { tagged } from 'daggy'
import fl from 'fantasy-land'

//- Sometimes, we want to produce a Functor computation _before_ we
//- know the functor that we want to use. To do this, we can use the
//- Free Functor to produce a tree (well, list) of the computation,
//- and apply an actual functor to it later on!

//+ data Free a = Value a | forall b. Map (b -> a) b
const Free = daggy.taggedSum('Data.Functor.Free', {
  Map: ['f', 'x'],
  Value: ['value']
})

const { Map, Value } = Free

/* Functor Free */ {
  Free.prototype[fl.map] = function (f) {
    return Map(f, this)
  }
}

//- Map the value into a functor, then map the composition.
//+ lower :: Functor f => Free a b ~> (forall a. a -> f a) -> f b
Free.prototype.lower = function (f) {
  return this.cata({
    Map: (g, x) => g(x.lower(f)),
    Value: f
  })
}

export default Free
