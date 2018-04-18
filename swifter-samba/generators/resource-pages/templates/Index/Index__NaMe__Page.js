// @flow

import * as React from 'react';
import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';

import __NaMe__ from 'models/__NaMe__';

import Page from 'components/Page';
import Loader from 'components/Loader';

import './Index__NaMe__Page.css';

type Props = {};

@observer
export default class Index__NaMe__Page extends React.Component<Props> {
  @observable __naMe__s: ?(__NaMe__[]);

  constructor(props: Props) {
    super(props);
    this.load__NaMe__s();
  }

  async load__NaMe__s() {
    const __naMe__s = await __NaMe__.index();
    runInAction(() => (this.__naMe__s = __naMe__s));
  }

  render() {
    return (
      <Page className="Index__NaMe__Page" title="List __NaMe__s">
        <Loader for={[this.__naMe__s]} render={this.renderContent} />
        Index__Na me__ Page
      </Page>
    );
  }

  renderContent = (__naMe__s: __NaMe__[]) => {
    return __naMe__s.map(__naMe__ => (
      <NamedLink key={__naMe__.id} to="__naMe__.show" params={{ id: __naMe__.id }}>
        __naMe__ id#{__naMe__.id}
      </NamedLink>
    ));
  };
}
