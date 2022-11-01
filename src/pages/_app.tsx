import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";

import {Provider as StyletronProvider} from 'styletron-react';
import {DarkTheme, BaseProvider} from 'baseui';
import {styletron} from '../utils/base-ui-utils';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <StyletronProvider value={styletron}>
        <BaseProvider theme={DarkTheme}>
          <Component {...pageProps} />
        </BaseProvider>
      </StyletronProvider>
    </>
  )
};

export default MyApp;
