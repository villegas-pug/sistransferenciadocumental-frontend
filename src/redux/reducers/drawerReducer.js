import { Send, YoutubeSearchedFor, CreateNewFolder } from '@material-ui/icons'
import {
   CAMBIAR_CONTENT_MAIN_DRAWER,
} from 'redux/actions/drawerAction'

const initialState = {
   configSidebar: [
      { label: 'Conservación', path: '/conservacion', icon: CreateNewFolder },
      { label: 'Búsqueda', path: '/busqueda', icon: YoutubeSearchedFor },
      { label: 'Transferencia', path: '/transferencia', icon: Send }
   ],
   contentMain: {
      title: 'Conservación Documental'
   }
}

export default (state = initialState, { type, payload }) => {
   switch (type) {
      case CAMBIAR_CONTENT_MAIN_DRAWER:
         return {
            ...state, contentMain: { title: `${payload} Documental` }
         }
      default:
         return initialState
   }
}