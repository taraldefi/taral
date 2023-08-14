// Generated with util/create-component.js
import React from 'react';

import {
  ProfileAddressCardProps,
  ProfilePersonalCardProps,
} from './ProfileCard.types';

import './ProfileCard.scss';

export const ProfileAddressCard: React.FC<ProfileAddressCardProps> = ({
  country,
  city,
  postCode,
  taxId,
}) => (
  <div data-testid="ProfileCard" className="profile--address--card">
    <h4 className="heading">Address</h4>
    <div className="grid--container">
      <div className="grid--item">
        <div className="grid--item--content">
          <span>Country</span>
          {country}
        </div>
      </div>
      <div className="grid--item">
        <div className="grid--item--content">
          <span>City/State</span>
          {city}
        </div>
      </div>
      <div className="grid--item">
        <div className="grid--item--content">
          <span>Postal Code</span>
          {postCode}
        </div>
      </div>
      <div className="grid--item">
        <div className="grid--item--content">
          <span>Tax ID</span>
          {taxId}
        </div>
      </div>
    </div>
  </div>
);

export const ProfilePersonalCard: React.FC<ProfilePersonalCardProps> = ({
  firstName,
  lastName,
  email,
  phone,
}) => (
  <div data-testid="ProfileCard" className="profile--address--card">
    <h4 className="heading">Profile</h4>
    <div className="grid--container">
      <div className="grid--item">
        <div className="grid--item--content">
          <span>First Name</span>
          {firstName}
        </div>
      </div>
      <div className="grid--item">
        <div className="grid--item--content">
          <span>Last Name</span>
          {lastName}
        </div>
      </div>
      <div className="grid--item">
        <div className="grid--item--content">
          <span>Email Address</span>
          {email}
        </div>
      </div>
      <div className="grid--item">
        <div className="grid--item--content">
          <span>Phone</span>
          {phone}
        </div>
      </div>
    </div>
  </div>
);
