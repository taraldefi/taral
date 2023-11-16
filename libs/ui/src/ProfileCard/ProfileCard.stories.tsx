// Generated with util/create-component.js
import React from "react";
import { ProfileAddressCard, ProfilePersonalCard } from "./ProfileCard";

export default {
  title: "ProfileCard",
};

export const AddressCard = () => (
  <ProfileAddressCard
    country={"United Kingdom"}
    city={"Leeds,ast London"}
    postCode={"ERT 2354"}
    taxId={"As45645756"}
  />
);

export const ProfileCard = () => (
  <ProfilePersonalCard
    firstName={"John"}
    lastName={"Doe"}
    email={"john@gmail.com"}
    phone={"+1 555 678 9012"}
  />
);
