/**
 * Copyright 2015 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Actions from '../actions';
import GuidesWrapper from './guides-wrapper';
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class Search extends React.Component {
  static fetchData(dispatch, props) {
    let url = `https://www.ifixit.com/api/2.0/search/${props.params.query}?filter=guide`;
    let boundActions = bindActionCreators(Actions, dispatch);
    return boundActions.loadUrl(url);
  }

  static needsStyles() {
    return 'guides.css';
  }

  componentDidMount() {
    let url = `https://www.ifixit.com/api/2.0/search/${this.props.params.query}?filter=guide`;
    if (this.props.urlToResponse.get(url) === undefined) {
      this.constructor.fetchData(this.props.dispatch, this.props);
    }
  }

  render() {
    let url = `https://www.ifixit.com/api/2.0/search/${this.props.params.query}?filter=guide`;
    let results = this.props.urlToResponse.get(url);
    let guides = results ? results.get('results') : null;

    return (
      <div>
        <div id="title-bar">{`iFixit Guides: '${this.props.params.query}'`}</div>
        <GuidesWrapper guides={guides} {...bindActionCreators(Actions, this.props.dispatch)}/>
      </div>
    );
  }
}

export default connect(state => ({urlToResponse: state.urlToResponse}))(Search);
