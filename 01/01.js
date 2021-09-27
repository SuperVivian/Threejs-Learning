function init(){
    console.log("Using Three.js version:"+THREE.REVISION)
    //1.场景
    var scene = new THREE.Scene();
    //2.摄像机
    var camera = new THREE.PerspectiveCamera(45,
        window.innerWidth/window.innerHeight,0.1,1000);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);//指向场景中心，默认是000
    //3.渲染器
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColorHex();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth,
        window.innerHeight);
    //4.轴
    var axes = new THREE.AxisHelper(10);
    scene.add(axes);

    //5.Plane
    var planeGeo = new THREE.PlaneGeometry(60,20);
    var planeMat = new THREE.MeshBasicMaterial(
        {color:0xcccccc,//灰色
        }
    );
    var plane = new THREE.Mesh(planeGeo,planeMat);
    plane.rotation.x = -0.5*Math.PI;
    plane.position.x = 15;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);

    //6.Cube
    var cubeGeo = new THREE.BoxGeometry(4,4,4);
    var cubeMat = new THREE.MeshBasicMaterial(
        {color:0xff0000,//红色
         wireframe:true
        }
    );
    var cube = new THREE.Mesh(cubeGeo,cubeMat);   
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    scene.add(cube);

    //7.Sphere
    var sphereGeo = new THREE.SphereGeometry(4,20,20);
    var sphereMat = new THREE.MeshBasicMaterial(
        {color:0xf7777ff,//
         wireframe:true
        }
    );
    var sphere = new THREE.Mesh(sphereGeo,sphereMat);   
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    scene.add(sphere);
    

    //最后添加到dom上
    document.getElementById("webgl-output").appendChild(
        renderer.domElement
    );
    //调用渲染器的渲染函数
    renderer.render(scene,camera);
}