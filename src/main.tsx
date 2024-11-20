window.ajaxStatus = 'resolved';
import React, { Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import Routers from './routers'
import Loading from '@components/Loading';
import './style/global.css';
import './index.css';
import { RecoilRoot } from 'recoil';


ReactDOM.createRoot(document?.getElementById('root')).render(
    <React.StrictMode>
      <Suspense fallback={<Loading/>}>
            <RecoilRoot>
<Suspense fallback={<Loading />}><Routers /></Suspense>
</RecoilRoot>
      </Suspense>
    </React.StrictMode>
)
