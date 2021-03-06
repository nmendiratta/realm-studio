////////////////////////////////////////////////////////////////////////////
//
// Copyright 2018 Realm Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
////////////////////////////////////////////////////////////////////////////

import * as React from 'react';
import { AutoSizer, ScrollSync } from 'react-virtualized';

import { IBaseTableContainerProps, Table } from './Table';

export class ResponsiveTable extends React.PureComponent<
  IBaseTableContainerProps,
  {}
> {
  public render() {
    return (
      <div className="RealmBrowser__Table">
        <AutoSizer>
          {sizeProps => (
            <ScrollSync>
              {scrollProps => (
                <Table
                  {...this.props}
                  scrollProps={scrollProps}
                  sizeProps={sizeProps}
                />
              )}
            </ScrollSync>
          )}
        </AutoSizer>
      </div>
    );
  }
}
