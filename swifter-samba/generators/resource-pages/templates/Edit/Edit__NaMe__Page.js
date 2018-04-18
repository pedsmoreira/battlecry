// @flow

import * as React from 'react';
import { observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import { Form, Field } from 'mobx-form-for';
import { redirect } from 'railed-router';

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

  get id(): ?number {
    return this.props.match.params.id;
  }

  async load__NaMe__() {
    const __naMe__ = this.id ? await __NaMe__.find(this.id) : new __NaMe__();
    runInAction(() => (this.__naMe__ = __naMe__));
  }

  handleSubmit = (event: SynthethicEvent<HTMLFormElement>, __naMe__: __NaMe__) => {
    await __naMe__.save();
    redirect('__naMe__.show', { id: __naMe__.id });
  };

  render() {
    return (
      <Page className="Show__NaMe__Page" title="Edit __NaMe__">
        <Loader for={this.__naMe__} render={this.renderContent} />
      </Page>
    );
  }

  renderContent = (__naMe__: __NaMe__) => {
    return (
      <Form onSubmit={this.handleSubmit}>
        { /* REPLACE_FORM_FIELDS */ }
      </Form>
    );
  };
}
