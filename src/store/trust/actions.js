import ActionTypes from '~/store/trust/types';

import {
  addTrustConnection,
  getTrustNetwork,
  removeTrustConnection,
} from '~/services/core';

const TRUST_CONNECTION_LIMIT = 3;

export function checkTrustState() {
  return async (dispatch, getState) => {
    const { safe } = getState();

    if (!safe.address) {
      return;
    }

    const network = await getTrustNetwork(safe.address);

    const isTrusted =
      network.reduce((acc, connection) => {
        return connection.isTrustingMe ? acc + 1 : acc;
      }, 0) > TRUST_CONNECTION_LIMIT;

    dispatch({
      type: ActionTypes.TRUST_UPDATE,
      meta: {
        isTrusted,
        network,
      },
    });
  };
}

export function trustUser(safeAddress) {
  return async (dispatch, getState) => {
    const { safe } = getState();

    if (!safe.address) {
      return;
    }

    await addTrustConnection(safe.address, safeAddress);
  };
}

export function untrustUser(safeAddress) {
  return async (dispatch, getState) => {
    const { safe } = getState();

    if (!safe.address) {
      return;
    }

    await removeTrustConnection(safe.address, safeAddress);
  };
}
