/*
 * Copyright 2020 Spotify AB
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

import {
  apiEntityV1alpha1Policy,
  componentEntityV1alpha1Policy,
  Entity,
  groupEntityV1alpha1Policy,
  locationEntityV1alpha1Policy,
  templateEntityV1alpha1Policy,
  userEntityV1alpha1Policy,
} from '@backstage/catalog-model';
import { CatalogProcessor } from './types';

export class BuiltinKindsEntityProcessor implements CatalogProcessor {
  private readonly policies = [
    apiEntityV1alpha1Policy,
    componentEntityV1alpha1Policy,
    groupEntityV1alpha1Policy,
    locationEntityV1alpha1Policy,
    templateEntityV1alpha1Policy,
    userEntityV1alpha1Policy,
  ];

  async validateEntityKind(entity: Entity): Promise<boolean> {
    for (const policy of this.policies) {
      const result = await policy.enforce(entity);
      if (result) {
        return true;
      }
    }

    return false;
  }
}
