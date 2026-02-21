import React, { Suspense } from 'react';
// import { Helmet } from '@modern-js/runtime/head';
import './index.css';

const Button = React.lazy(() => import('provider/Button'));

const localStyle = `
  .button { 
    background: #000;
  }
`;


const Index = () => (
  <div className="container-box">
    <style>{localStyle}</style>

    {/* <Helmet>
      <link
        rel="icon"
        type="image/x-icon"
        href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico"
      />
    </Helmet> */}

    <div>
      <h1>Button Isolated Style</h1>
      <div className='button-group'>
        <button className="button">I am a button from Consumer </button>
        <Suspense fallback={<p>Loading ...</p>}>
          <Button label="I am a button from Provider" />
        </Suspense>
      </div>
    </div>

  </div>
);

export default Index;
