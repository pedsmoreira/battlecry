// @flow

import * as React from 'react';
import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';

import __NaMe__ from 'models/__NaMe__';

import Page from 'components/Page';
import Loader from 'components/Loader';

import './Show__NaMe__Page.css';

type Props = {
  match: {
    params: {
      id: number
    }
  }
};

@observer
export default class Show__NaMe__Page extends React.Component<Props> {
  @observable __naMe__: ?__NaMe__;

  constructor(props: Props) {
    super(props);
    this.load__NaMe__();
  }

  get id(): number {
    return this.props.match.params.id;
  }

  async load__NaMe__() {
    const __naMe__ = await __NaMe__.find(this.id);
    runInAction(() => (this.__naMe__ = __naMe__));
  }

  render() {
    return (
      <Page className="Show__NaMe__Page" title="__NaMe__">
        <Loader for={this.__naMe__} render={this.renderContent} />
      </Page>
    );
  }

  renderContent = (__naMe__: __NaMe__) => {
    return `Show __naMe__ id#${__naMe__.id}`;
  };
}
