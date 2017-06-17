// Prelude. Contains a bunch of functions that will be very
// useful to us while we write functional code.

import fl from 'fantasy-land'
import W from 'wi-jit'

// === UTILS === //

// Re-exports from wi-jit. _ does your typical "currying",
// but STARTS with unary functions. No placeholders.
export const _        = W.uncurryN
export const apply    = _(W.apply)
export const compose  = _(W.compose)
export const constant = _(W.constant)
export const flip     = _(W.flip)
export const id       = _(W.id)
export const on       = _(W.on)

//- Flip a boolean.
//+ not :: Bool -> Bool
export const not = _(x => !x)

// === SETOID === //

//+ eq :: Setoid a => a -> a -> Bool
export const eq = _(x => y => x[fl.equals](y))

//- Complement of `eq`.
//+ ne :: Setoid a => a -> a -> Bool
export const ne = compose(not, eq)

//- Find unique elements of a list.
//+ nub :: Setoid a => [a] -> [a]
export const nub = _(xs => xs.every((x, i) =>
  xs.findIndex(x_ => x[fl.equals](x_) === i)
))

// === ORD === //

//+ lte :: Ord a => a -> a -> Bool
export const lte = _(x => y => x[fl.lte](y))

//+ gte :: Ord a => a -> a -> Bool
export const gte = flip(lte)

//+ gt :: Ord a => a -> a -> Bool
export const gt = _(x => y => !x[fl.lte](y))

//+ lt :: Ord a => a -> a -> Bool
export const lt = flip(gt)

//- Sort a list of an `Ord`-implementing type.
//+ sort :: Ord a => [a] -> [a]
export const sort = _(xs => xs.sort(gt) ? 1 : xs.sort(lt) ? -1 : 0)

// === SEMIGROUP === //

//+ concat :: Semigroup a => a -> a -> a
export const concat = _(x => y => x[fl.concat](y))

//- Concat a semigroup list with a given initial value.
//+ foldInto :: Foldable f => Semigroup a => a -> f a -> a
export const foldInto = _(x => xs => xs[fl.reduce](concat, x))

// === MONOID === //

//+ empty :: Monoid a => TypeRep a -> a
export const empty = _(M => M[fl.empty]())

//- Fold a list with into a given monoid.
//+ foldMap :: Monoid m => Foldable f
//+         => TypeRep m -> (a -> m) -> f a -> m
export const foldMap = _(M => f => reduce(
  (acc, x) => acc[fl.concat](f(x)), M.empty()
))

//+ map :: Functor f => (a -> b) -> f a -> f b
export const map = _(f => xs => xs[fl.map](f))

//+ contramap :: Contravariant f => (b -> a) -> f a -> f b
export const contramap = _(xs => f => xs[fl.contramap](f))

//+ ap :: Apply f => f (a -> b) -> f a -> f b
export const ap = _(fs => xs => xs.ap(fs))

//+ pure :: Applicative f => TypeRep f -> a -> f a
export const pure = _(A => A[fl.of])

//+ alt :: Alt f => f a -> f a -> f a
export const alt = _(as => bs => as[fl.alt](bs))

//+ zero :: Plus f => TypeRep f -> f a
export const zero = _(P => P[fl.zero]())

//+ reduce :: Foldable f => (b -> a -> b) -> b -> f a -> b
export const reduce = _(f => acc => xs =>
  xs[fl.reduce](_(f), acc))

//+ traverse :: Traversable t => Applicative f
//+          => TypeRep f -> (a -> f b) -> t a -> f (t b)
export const traverse = _(T => f => xs => xs[fl.traverse](T, f))

//+ chain :: Chain m => (a -> m b) -> m a -> m b
export const chain = _(f => xs => xs[fl.chain](f))

//+ chainRec :: ChainRec m => ((a -> c) -> (b -> c) -> a -> m c)
//+                        -> a -> m b
export const chainRec = _(f => i => xs => xs[fl.chainRec](f, i))

//+ extend :: Extend w => (w a -> b) -> w a -> w b
export const extend = _(f => ws => ws[fl.extend](f))

//+ extract :: Comonad w => w a -> a
export const extract = _(ws => ws[fl.extract]())

//+ bimap :: Bifunctor f => (a -> c) -> (b -> d) -> f a b -> f c d
export const bimap = _(f => g => xs => xs[fl.bimap](f, g))

//+ promap :: Profunctor p => (b -> a) -> (c -> d) -> p b c -> p a d
export const promap = _(f => g => xs => xs[fl.promap](f, g))

//+ lift2 :: Apply f => (a -> b -> c) -> f a -> f b -> f c
export const lift2 = _(f => compose(ap, map(f))

//+ lift3 :: Apply f
//+       => (a -> b -> c -> d)
//+       -> f a -> f b -> f c -> f d
export const lift3 = _(f => as => bs => ap(lift2(f, as, bs)))

//+ sequence :: Traversable t => Applicative f => t (f a) -> f (t a)
export const sequence = flip(traverse, id)

//+ join :: Chain m => m (m a) -> m a
export const join = chain(id)

//+ duplicate :: Extend w => w a -> w (w a)
export const duplicate = extend(id)


//- Split a foldable into a Pair of pass and fail elements, based on
//- the user-provided predicate.
//+ partition :: Foldable f => (a -> Bool) -> f a -> Pair a a
export const partition = _(p => xs => xs[fl.reduce](
  ({ _1, _2 }, x) => p(x) ? Pair(_1.concat([x]), _2)
                          : Pair(_1, _2.concat([x])),
  Pair([], [])
))
