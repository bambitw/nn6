const nn6 = require('../lib/nn6')

// 2x+y=3
//  x+y=2
// 解答： x=1, y=1
class Net1 extends nn6.net.Net {
  constructor () {
    super()
    let {x, y, r1, r2, _2x, f} = this.addVariables(['x', 'y', 'r1', 'r2', '_2x', 'f'])
    this.setDumpVariables(['x', 'y', 'r1', 'r2', 'f'])
    let [c1, c2, c3] = nn6.node.newConstants([1, 2, 3])
    this.out = f
    this.gates = [
      new nn6.gate.Mul([c2, x], _2x),
      new nn6.gate.Add([_2x, y], r1),
      new nn6.gate.Add([x, y], r2),
      new nn6.net.SqrtError([[r1, r2], [c3, c2]], f, this)
    ]
  }
}

nn6.GradientDescendent(new Net1(), 1000)
