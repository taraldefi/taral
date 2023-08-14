// Generated with util/create-component.js
import React from 'react';
import { EntityType } from './Entity.types';
import './Entity.scss';

export function Entity({ entityData, modal }: EntityType) {
  return (
    <div className="entity--wrapper">
      <div className="entity--top--content">
        <div className="entity--image--container">
          <img
            className="images"
            src={entityData.image}
            alt=""
            width="100%"
            height="100%"
          ></img>
        </div>
        <div className="entity--title--box">
          <span>{entityData.title}</span>
          <span>55-NB</span>
        </div>
        <div className="options--container">{modal}</div>
      </div>
      <div className="bottom--content">
        <div className="registration--container">
          <span>REGISTRATION NUMBER</span>
          <span>{entityData.registrationNo}</span>
        </div>
        <div className="product--container">
          <span>PRODUCTS</span>
          <span>{entityData.products}</span>
        </div>
        <div className="applications--container">
          <span>APPLICATIONS</span>
          <span>{entityData.applications}</span>
        </div>
      </div>
    </div>
  );
}
