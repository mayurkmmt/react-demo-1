import React from 'react';
import { FormattedMessage } from 'react-intl';

import BrandPanel from './components/BrandPanel';
import FamilyPanel from './components/FamilyPanel';
import DevicePanel from './components/DevicePanel';
import IssuesPanel from './components/IssuesPanel';
import AddonsPanel from './components/AddonsPanel';
import ReviewPanel from './components/ReviewPanel';
import LocationPanel from './components/LocationPanel';
import PostalCodePanel from './components/PostalCodePanel';
import SlotPanel from './components/SlotPanel';

const groups = {
  area: <FormattedMessage id="Steps.groups.area" defaultMessage="Service area" />,
  device: <FormattedMessage id="Steps.groups.device" defaultMessage="Device" />,
  services: <FormattedMessage id="Steps.groups.services" defaultMessage="Services" />,
  review: <FormattedMessage id="Steps.groups.review" defaultMessage="Review" />,
  pickUp: <FormattedMessage id="Steps.groups.location" defaultMessage="Pick up" />,
};

const steps = [
  {
    id: 'postalCode',
    /*     title: <FormattedMessage
      id="Steps.steps.postalCode.title"
      defaultMessage="Let's repair your phone or tablet"
    />,
    description: <FormattedMessage
      id="Steps.steps.postalCode.description"
      defaultMessage="Fill in the form to get an instant quote. Let's start with your postal code."
    />, */
    Component: PostalCodePanel,
    extraProps: ['subscribeUrl'],
    group: 'area',
  },
  {
    id: 'brand',
    title: <FormattedMessage
      id="Steps.steps.brand.title"
      defaultMessage="Vilket varumärke?"
    />,
    /*     description: <FormattedMessage
      id="Steps.steps.brand.description"
      defaultMessage="Please select brand of mobile device"
    />, */
    Component: BrandPanel,
    group: 'device',
  },
  {
    id: 'family',
    title: <FormattedMessage
      id="Steps.steps.family.title"
      defaultMessage="Type?"
    />,
    /*     description: <FormattedMessage
      id="Steps.steps.family.description"
      defaultMessage="Please select type of mobile device"
    />, */
    Component: FamilyPanel,
    group: 'device',
    resetOn: ['brand'],
  },
  {
    id: 'device',
    title: <FormattedMessage
      id="Steps.steps.device.title"
      defaultMessage="Model?"
    />,
    /*     description: <FormattedMessage
      id="Steps.steps.device.description"
      defaultMessage="Please select the model"
    />, */
    Component: DevicePanel,
    group: 'device',
    resetOn: ['brand', 'family'],
  },
  {
    id: 'issues',
    title: <FormattedMessage
      id="Steps.steps.issues.title"
      defaultMessage="Service option?"
    />,
    description: <FormattedMessage
      id="Steps.steps.issues.description"
      defaultMessage='If unclear, select "Problem Unknown!" for free diagnostic option. Our Technical Support team will get back to you.'
    />,
    Component: IssuesPanel,
    group: 'services',
    resetOn: ['family', 'brand', 'device'],
    extraProps: ['locale'],
  },
  {
    id: 'addons',
    title: <FormattedMessage
      id="Steps.steps.addons.title"
      defaultMessage="Add-ons"
      />,
    description: <FormattedMessage
      id="Steps.steps.addons.description"
      defaultMessage="You might want to consider some popular add‑ons & accessories for your model."
    />,
    Component: AddonsPanel,
    group: 'services',
    resetOn: ['family', 'brand', 'device'],
    extraProps: ['locale'],
  },
  {
    id: 'location',
    title: <FormattedMessage
      id="Steps.steps.location.title"
      defaultMessage="Personal & Pick Up information"
    />,
    Component: LocationPanel,
    group: 'pickUp',
    extraProps: ['tosUrl', 'ppUrl'],
  },
  {
    id: 'slot',
    title: <FormattedMessage
      id="Steps.steps.slot.title"
      defaultMessage="Select a time for pick up"
    />,
    Component: SlotPanel,
    group: 'pickUp',
    extraProps: ['locale'],
  },
  {
    id: 'review',
    title: <FormattedMessage
      id="Steps.steps.review.title"
      defaultMessage="Review your order"
    />,
    Component: ReviewPanel,
    group: 'review',
    extraProps: ['vat', 'shipmentFee'],
  },
];

export {
  groups,
  steps,
};
