import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

import Persik from './panels/Persik';

const App = () => {
	const [activePanel, setActivePanel] = useState('persik');
	const [popout, setPopout] = useState(null);
  const [mouse, setMouse] = useState({x: 100, y: 100})

	useEffect(() => {
    bridge.send("VKWebAppInit");
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});

    bridge.send("VKWebAppAccelerometerStart", {"refresh_rate": 50});

    bridge.subscribe(({ detail: { type, data }}) => {
      if (type === 'VKWebAppAccelerometerChanged') {
        console.log(data)
        setMouse(prev => ({
              ...prev,
              x: prev.x-data.x*3,
              y: prev.y+data.y*3
          }))
      }
    });
	}, []);

	return (
          <Persik id='persik' mouse={mouse}/>
	);
}

export default App;
