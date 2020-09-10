import '../../node_modules/noty/lib/noty.css'
import '../../node_modules/noty/lib/themes/bootstrap-v4.css'
import Noty from 'noty'

export default (type, text) => {
   new Noty({
      type: type.toLowerCase(),
      theme: 'bootstrap-v4',
      timeout: 2000,
      text,
      killer: true,
   }).show()
}