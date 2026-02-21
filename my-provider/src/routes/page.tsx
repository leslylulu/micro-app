import React from 'react';
import { Helmet } from '@modern-js/runtime/head';
import './index.css';
import Provider from '../components/ProviderComponent';
// import Button from '@/components/IsolatedButton/Button';
const Button = React.lazy(() => import('@/components/IsolatedButton/Button'));

const Index = () => (
  <div className="container-box">
    {/* <Helmet>
      <link
        rel="icon"
        type="image/x-icon"
        href="https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/favicon.ico"
      />
    </Helmet> */}
    <h1>From Provider Page</h1>
    <Button label="Button in Provider src/components" />
  </div>
);

export default Index;
