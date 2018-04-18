// @flow

import * as React from 'react';
import { observer } from 'mobx-react';

import Page from 'components/Page';

import './__NaMe__Page.css';

type Props = {};

@observer
export default class __NaMe__Page extends React.Component<Props> {
  render() {
    return <Page className="__NaMe__Page">__Na me__ Page</Page>;
  }
}
