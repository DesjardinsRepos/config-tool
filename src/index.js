import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const input = {
  status: 'running',
  roles: [
    {
      name: '3-Axis-Portal V1',
      template_device: 'https://api.goldi-labs.de/devices/c3107d57-08bf-4eda-9635-28564a46a1d0',
      'x-esc-position': {
        x: 800,
        y: 300,
      },
    },
    {
      name: 'IO-Board',
      template_device: 'https://api.goldi-labs.de/devices/c3107d57-08bf-4eda-9635-28564a46a1d0',
      'x-esc-position': {
        x: 800,
        y: 600,
      },
    },
    {
      name: 'ECP',
      template_device: 'https://api.goldi-labs.de/devices/c3107d57-08bf-4eda-9635-28564a46a1d0',
      'x-esc-position': {
        x: 200,
        y: 400,
      },
    },
  ],
  serviceConfigurations: [
    {
      serviceType: 'http://api.goldi-labs.de/serviceTypes/webcam',
      configuration: {},
      participants: [
        {
          serviceId: 'webcam',
          role: 'ECP',
          config: {},
        },
        {
          serviceId: 'webcam',
          role: '3-Axis-Portal V1',
          config: {},
        },
      ],
      id: 'ce2ca59d-2c25-4e52-bd03-829f9ab6fa10',
    },
    {
      serviceType: 'http://api.goldi-labs.de/serviceTypes/electrical',
      configuration: {},
      participants: [
        {
          serviceId: 'electrical',
          role: 'ECP',
          config: {
            interfaces: [
              {
                interfaceId: '1',
                interfaceType: 'gpio',
                signals: {
                  gpio: 'LimitXLeft',
                },
                busId: 'LimitXLeft',
              },
              {
                interfaceId: '8',
                interfaceType: 'gpio',
                signals: {
                  gpio: 'XMotorLeft',
                },
                busId: 'XMotorLeft',
              }
            ],
          },
        },
        {
          serviceId: 'sensors',
          role: '3-Axis-Portal V1',
          config: {
            interfaces: [
              {
                interfaceId: '1',
                interfaceType: 'gpio',
                signals: {
                  gpio: 'LimitXLeft',
                },
                busId: 'LimitXLeft',
              }
            ],
          },
        },
        {
          serviceId: 'actuators',
          role: '3-Axis-Portal V1',
          config: {
            interfaces: [
              {
                interfaceId: '8',
                interfaceType: 'gpio',
                signals: {
                  gpio: 'XMotorLeft',
                },
                busId: 'XMotorLeft',
              }
            ],
          },
        },
        {
          serviceId: 'pins',
          role: 'IO-Board',
          config: {
            interfaces: [
              {
                interfaceId: '1',
                interfaceType: 'gpio',
                signals: {
                  gpio: 'A1',
                },
                busId: 'LimitXLeft',
              }
            ],
          },
        },
      ],
      id: 'd1b922d7-40d8-4718-a90c-dca2ad9fc3b6',
    },
  ],
}

const callback = config => console.log(config)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App callback={callback} input={input}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
