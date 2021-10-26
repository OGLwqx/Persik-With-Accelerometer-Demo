import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

import Persik from './panels/Persik';

const App = () => {
	const [activePanel, setActivePanel] = useState('persik');
	const [popout, setPopout] = useState(null);
  const [mouse, setMouse] = useState({x: 100, y: 100});
  const [barrier, setBarrier] = useState({
  	x: 200,
    y: 200,
    width: 130,
    height: 10
  });
  const [barrier2, setBarrier2] = useState({
  	x: 0,
    y: 400,
    width: 130,
    height: 10
  });

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
        //console.log(data)
        setMouse(prev => ({
              ...prev,
              x: prev.x-data.x*3,
              y: prev.y+data.y*3
          }))
          //console.log(barrier.x)

      }
    );

    // oh shit

    setBarrier(prev => ({
      ...prev,
      leftX: barrier.x,
      leftY: barrier.y-barrier.y*0.05,
      rightX: barrier.x+barrier.width*2,
      rightY: barrier.y+barrier.width-barrier.height*2
  }))
  setBarrier2(prev => ({
    ...prev,
    leftX: barrier2.x,
    leftY: barrier2.y-barrier2.y*0.05,
    rightX: barrier2.x+barrier2.width*2,
    rightY: barrier2.y+barrier2.width-barrier2.height*2
}))
  //console.log(barrier)
	}, []);

  useEffect(() => {
    //console.log('mouse changed')
    //console.log('mouse'+mouse.x)
    if(mouse.x > barrier.x && mouse.y > barrier.leftY && mouse.y < barrier.rightY && mouse.x < barrier.rightX)
    {
      //console.log('detected')
      //console.log(acc.x)
      setMouse(prev => ({
        ...prev,
        x: prev.x+acc.x*3,
        y: prev.y-acc.y*3
    }))
    }
    console.log(barrier2.rightX+' | '+ mouse.x)
    if(mouse.x > barrier2.x && mouse.y > barrier2.leftY && mouse.y < barrier2.rightY && mouse.x < barrier2.rightX)
    {
      console.log(barrier2.rightX+' | '+ mouse.x)
      //console.log('detected')
      //console.log(acc.x)
      setMouse(prev => ({
        ...prev,
        x: prev.x+acc.x*3,
        y: prev.y-acc.y*3
    }))
    }
  }, [mouse])


	return (
          <Persik id='persik' mouse={mouse} barrier={barrier} barrier2={barrier2}/>
	);
}

export default App;
