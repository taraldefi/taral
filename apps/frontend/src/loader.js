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
    left: 0,
    right: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
}
.loader {
 --clr: #1AB98B;
 /* color of spining  */
 width: 50px;
 height: 50px;
 position: relative;
}
.loader div:nth-child(1), .loader div:nth-child(2) {
 content: "";
 position: absolute;
 top: -10px;
 left: -10px;
 width: 100%;
 height: 100%;
 border-radius: 100%;
 border: 10px solid transparent;
 border-top-color: var(--clr);
}
.loader div:nth-child(1) {
 z-index: 100;
 animation: spin 1s infinite;
}
.loader div:nth-child(2) {
 border: 10px solid #ccc;
}
@keyframes spin {
 0% {
  -webkit-transform: rotate(0deg);
  -ms-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
 }
 100% {
  -webkit-transform: rotate(360deg);
  -ms-transform: rotate(360deg);
  -o-transform: rotate(360deg);
  transform: rotate(360deg);
 }
}`;