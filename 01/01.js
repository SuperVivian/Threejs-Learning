
var scene;
var camera;
var renderer;


function init(){
    console.log("Using Three.js version:"+THREE.REVISION)

    //显示帧率
    var stats = initStats();
    function initStats(){
        var stats = new Stats();
        stats.setMode(0);//0:fps,1:ms

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        
        document.getElementById('stats-output').appendChild(stats.domElement);
        return stats;
    }

    //场景
    scene = new THREE.Scene();
    //摄像机
    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.set(-30,40,30);
    camera.lookAt(scene.position);//指向场景中心，默认是000
    //渲染器
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.shadowMapEnabled = true;//渲染器要开启阴影

    //聚光灯
    var spotLight = new THREE.SpotLight(0xffffff);//要添加能产生阴影的光源
    spotLight.position.set(-40,60,-10);
    spotLight.castShadow = true;
    scene.add(spotLight);
    
    //环境光
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    //轴
    //红色是x，绿色是y，蓝色是z
    var axes = new THREE.AxisHelper(10);
    scene.add(axes);

    //Plane
    var planeGeo = new THREE.PlaneGeometry(60,20);
    var planeMat = new THREE.MeshLambertMaterial(
        {color:0xcccccc,//灰色
        }
    );
    var plane = new THREE.Mesh(planeGeo,planeMat);
    plane.receiveShadow = true;//要指定接受阴影的物体
    //左边是正，右边是负
    plane.rotation.x = -0.5*Math.PI;
    plane.position.set(15,0,0);
    scene.add(plane);

    //Cube
    var cubeGeo = new THREE.BoxGeometry(4,4,4);
    var cubeMat = new THREE.MeshLambertMaterial(
        {color:0xff0000,//红色
        }
    );
    var cube = new THREE.Mesh(cubeGeo,cubeMat);   
    cube.castShadow = true;//要指定产生阴影的物体
    cube.position.set(-5,3,0);
    scene.add(cube);

    //Sphere
    var sphereGeo = new THREE.SphereGeometry(4,20,20);
    var sphereMat = new THREE.MeshLambertMaterial(
        {color:0xf7777ff,//
        }
    );
    var sphere = new THREE.Mesh(sphereGeo,sphereMat);   
    sphere.castShadow = true;
    sphere.position.set(20,4,2);
    scene.add(sphere);
    
    //Circle
    var circleGeo = new THREE.CircleGeometry(10,12,0,Math.PI);
    var circleMat = new THREE.MeshLambertMaterial(
        {color:0xf7777ff,//
        }
    );
    var circle = new THREE.Mesh(circleGeo,circleMat);   
    circle.position.set(20,4,2);
    circle.rotation.x = -0.5*Math.PI;
    scene.add(circle);

    //最后添加到dom上
    document.getElementById("webgl-output").appendChild(
        renderer.domElement
    );
    
    //摄像机控制（引用的.js文件不存在）
    // var trackballControls = initTrackballControls(camera,renderer); 
    // var clock = new THREE.Clock();

    var step = 0;
    var controls  = new function(){
        this.rotationSpeed = 0.02;
        this.bouncingSpeed = 0.03;
    }
    var gui = new dat.GUI();
    gui.add(controls,'rotationSpeed',0,0.5);
    gui.add(controls,'bouncingSpeed',0,0.5);

    renderScene();
    function renderScene(){
        //摄像机控制函数的刷新
        // trackballControls.update(clock.getDelta());
        //帧率显示的刷新
        stats.update();
        //立方体旋转
        cube.rotation.x +=controls.rotationSpeed;
        cube.rotation.y +=controls.rotationSpeed;
        cube.rotation.z +=controls.rotationSpeed;
        //球体弹跳
        step +=controls.bouncingSpeed;
        sphere.position.x = 20 + (10*(Math.cos(step))); 
        sphere.position.y = 2 + (10*Math.abs((Math.sin(step)))); 
        //回调
        requestAnimationFrame(renderScene);
        //调用渲染器的渲染函数
        renderer.render(scene,camera);
    }      

}

function onResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}