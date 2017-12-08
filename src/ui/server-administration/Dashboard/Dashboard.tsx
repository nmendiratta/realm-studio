import * as React from 'react';
import { Button } from 'reactstrap';

import { getPlatformLanguage, getPlatformTitle, Platform } from '.';
import nodeJsLogo from '../../../../static/svgs/node-js-logo.svg';
import xamarinLogo from '../../../../static/svgs/xamarin-logo.svg';
import { IUser } from '../../../services/ros';
import { PlatformOverlay } from './PlatformOverlay';

import './Dashboard.scss';

export const displayPlatform = (platform: Platform) => {
  const title = getPlatformTitle(platform);
  const language = getPlatformTitle(platform);
  return `${title} (${language})`;
};

interface IDashboardProps {
  hoveringPlatform?: Platform;
  isCloudTenant: boolean;
  onDeselectPlatform: () => void;
  onMouseEnterPlatform: (platform: Platform) => void;
  onMouseLeavePlatform: () => void;
  onSelectPlatform: (platform: Platform) => void;
  onShowCloudTutorial: () => void;
  selectedPlatform?: Platform;
  serverUrl: string;
}

export const Dashboard = ({
  hoveringPlatform,
  isCloudTenant,
  onDeselectPlatform,
  onMouseEnterPlatform,
  onMouseLeavePlatform,
  onSelectPlatform,
  onShowCloudTutorial,
  selectedPlatform,
  serverUrl,
}: IDashboardProps) => (
  <section className="Dashboard">
    <h2 className="Dashboard__Heading">
      Welcome to your very own Realm Cloud server
    </h2>
    <section className="Dashboard__Tutorial">
      <p>
        We've prepared a tutorial that will guide you to synchronize objects in
        just 5 minutes.
      </p>
      <Button onClick={onShowCloudTutorial}>
        Start the Realm Cloud tutorial
      </Button>
    </section>
    <div className="Dashboard__Separator">
      or click a platform below to connect immediately
    </div>
    <section className="Dashboard__Platforms">
      <section className="Dashboard__PlatformIcons">
        <div
          className="Dashboard__Platform"
          onMouseEnter={() => onMouseEnterPlatform('android')}
          onMouseLeave={() => onMouseLeavePlatform()}
          onClick={() => onSelectPlatform('android')}
        >
          <i className="fa fa-android" />
        </div>
        <div
          className="Dashboard__Platform"
          onMouseEnter={() => onMouseEnterPlatform('apple')}
          onMouseLeave={() => onMouseLeavePlatform()}
          onClick={() => onSelectPlatform('apple')}
        >
          <i className="fa fa-apple" />
        </div>
        <div
          className="Dashboard__Platform"
          onMouseEnter={() => onMouseEnterPlatform('javascript')}
          onMouseLeave={() => onMouseLeavePlatform()}
          onClick={() => onSelectPlatform('javascript')}
        >
          <svg
            className="Dashboard__Platform__JavascriptLogo"
            viewBox={nodeJsLogo.viewBox}
          >
            <use xlinkHref={nodeJsLogo.url} />
          </svg>
        </div>
        <div
          className="Dashboard__Platform"
          onMouseEnter={() => onMouseEnterPlatform('xamarin')}
          onMouseLeave={() => onMouseLeavePlatform()}
          onClick={() => onSelectPlatform('xamarin')}
        >
          <svg
            className="Dashboard__Platform__XamarinLogo"
            viewBox={xamarinLogo.viewBox}
          >
            <use xlinkHref={xamarinLogo.url} />
          </svg>
        </div>
      </section>
      <p className="Dashboard__PlatformTip">
        {hoveringPlatform ? displayPlatform(hoveringPlatform) : null}
      </p>
    </section>
    {selectedPlatform ? (
      <PlatformOverlay
        onClose={onDeselectPlatform}
        platform={selectedPlatform}
        serverUrl={serverUrl}
      />
    ) : null}
  </section>
);
