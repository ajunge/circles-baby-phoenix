import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

import ProfileImage from '~/components/ProfileImage';
import UsernameDisplay from '~/components/UsernameDisplay';
import styles from '~/styles/variables';

const ProfileMini = props => {
  return (
    <ProfileMiniStyle isInline={props.isInline}>
      <ProfileImage address={props.address} />

      <UsernameDisplayStyle isLarge={props.isLarge}>
        <UsernameDisplay address={props.address} />
      </UsernameDisplayStyle>
    </ProfileMiniStyle>
  );
};

ProfileMini.propTypes = {
  address: PropTypes.string.isRequired,
  isInline: PropTypes.bool,
  isLarge: PropTypes.bool,
};

const ProfileMiniStyle = styled.div`
  display: inline-flex;

  overflow: hidden;

  padding: 1rem;

  border-radius: 5px;

  background-color: ${styles.monochrome.white};

  box-shadow: ${props => {
    return props.isInline ? '0' : `1px 1px 4px ${styles.monochrome.grayDark}`;
  }};

  align-items: center;
`;

const UsernameDisplayStyle = styled.span`
  overflow: hidden;

  text-overflow: ellipsis;

  padding-left: 1rem;

  white-space: nowrap;

  font-weight: ${styles.base.typography.weight};
  font-size: ${props => {
    return props.isLarge ? '1.5em' : '1em';
  }};
`;

export default ProfileMini;
