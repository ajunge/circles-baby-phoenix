import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Bubble from '~/components/Bubble';
import ButtonBack from '~/components/ButtonBack';
import ButtonHome from '~/components/ButtonHome';
import ButtonPrimary from '~/components/ButtonPrimary';
import Footer from '~/components/Footer';
import UsernameDisplay from '~/components/UsernameDisplay';
import View from '~/components/View';
import logError from '~/utils/debug';
import notify, { NotificationsTypes } from '~/store/notifications/actions';
import { BackgroundPurpleCircle } from '~/styles/Background';
import { hideSpinnerOverlay, showSpinnerOverlay } from '~/store/app/actions';
import { untrustUser } from '~/store/trust/actions';

import Header, {
  HeaderCenterStyle,
  HeaderTitleStyle,
} from '~/components/Header';

const TrustRevokeConfirm = (props, context) => {
  const { address } = props.match.params;
  const [isSent, setIsSent] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    dispatch(showSpinnerOverlay());

    try {
      await dispatch(untrustUser(address));

      dispatch(
        notify({
          text: context.t('TrustRevokeConfirm.successMessage'),
        }),
      );

      setIsSent(true);
    } catch (error) {
      logError(error);

      dispatch(
        notify({
          text: context.t('TrustRevokeConfirm.errorMessage'),
          type: NotificationsTypes.ERROR,
        }),
      );
    }

    dispatch(hideSpinnerOverlay());
  };

  if (isSent) {
    return <Redirect to="/" />;
  }

  return (
    <BackgroundPurpleCircle>
      <Header>
        <ButtonBack to={`/profile/${address}`} />

        <HeaderCenterStyle>
          <HeaderTitleStyle>
            {context.t('TrustRevokeConfirm.revokeTrust')}
          </HeaderTitleStyle>
        </HeaderCenterStyle>

        <ButtonHome />
      </Header>

      <View isCentered isFooter isHeader>
        <Bubble>
          <p>
            {context.t('TrustRevokeConfirm.confirmationText')}
            <UsernameDisplay address={address} />
            {context.t('TrustRevokeConfirm.confirmationTextAfter')}
          </p>
        </Bubble>
      </View>

      <Footer>
        <ButtonPrimary onClick={onSubmit}>
          {context.t('TrustRevokeConfirm.confirm')}
        </ButtonPrimary>
      </Footer>
    </BackgroundPurpleCircle>
  );
};

TrustRevokeConfirm.contextTypes = {
  t: PropTypes.func.isRequired,
};

TrustRevokeConfirm.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(TrustRevokeConfirm);
