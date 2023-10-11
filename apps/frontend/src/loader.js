export default `
body{
display: block;
}
#globalLoader{
    position: fixed;
    z-index: 1700;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
.loader {
    border: 10px solid #f3f3f3; /* Light grey */
    border-top: 10px solid #1AB98B; /* Dark Green */
    border-radius: 50%;
    height: 100px;
    width: 100px;
   
    animation: spinloader 2s linear infinite;
}
.loader img{
    height : 100px;
    width : 100px;
    animation: spinlogo 2s linear infinite;
}
@keyframes spinloader {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
@keyframes spinlogo {
    0% { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
}
}`;
