export const presets: Record<string, string> = {
  donut: `var R1 = 3;
var R2 = 2;

var SCREEN_WIDTH = 50;
var SCREEN_HEIGHT = 20;

var K2 = 7;
var K1 = SCREEN_HEIGHT*K2*5/(8*(R1+R2));

var ASCII = [".", "," , "-" , "~" , ":" , ";" , "=" , "!" , "*" , "#" , "$" , "@"];

fun asciiDonut(){
    var zBuffer = [0];
    var outputArr = [" "];

    for (var y = 0; y < SCREEN_HEIGHT; y = y + 1) {
        zBuffer[y] = [0];
        outputArr[y] = [" "];
        for (var x = 0; x < SCREEN_WIDTH; x = x + 1){
                zBuffer[y][x] = 0;
                outputArr[y][x] = " ";
            }
    }

    var cA = cos(A); var cB = cos(B);
    var sA = sin(A); var sB = sin(B);

    var cAsB = cA*sB;
    var sAsB = sA*sB;
    var sAcB = sA*cB;
    var cAcB = cA*cB;

    for (var i = 0 ; i < 6.28 ; i = i + 0.12){
        var cTheta = cos(i); var sTheta = sin(i);
        for (var j = 0; j < 6.28; j = j + 0.1) {
            var cPhi = cos(j); var sPhi = sin(j);

            var x = R1 + R2 * cTheta; var y = R2 * sTheta;

            var xDonut = (cB * cPhi + sAsB*sPhi)*x - cAsB*y;
            var yDonut = (sB*cPhi - sAcB*sPhi) * x + cAcB*y;
            var zDonut = cA * sPhi * x + sA * y;
            var ooz = 1/(K2 + zDonut);

            var xProj = xDonut*K1*ooz; var yProj = yDonut*K1*ooz;

            var px = SCREEN_WIDTH / 2 + xProj * 2;
            var py = SCREEN_HEIGHT / 2 - yProj;

            var yNormal = (sB*cPhi - sAcB*sPhi) * cTheta + cAcB*sTheta;
            var zNormal = cA * sPhi * cTheta + sA * sTheta;


            var luminance = yNormal - zNormal;
            if (luminance > 0){
                if (px >= 0 and px < SCREEN_WIDTH and py >= 0 and py < SCREEN_HEIGHT and ooz >= zBuffer[py][px]) {
                    zBuffer[py][px] = ooz;
                    var luminance_index = luminance*8;
                    var L = floor(luminance_index);
                    if (L < 0 ){
                        L = 0;
                    }else if (L > 11){
                        L = 11;
                    }

                    var ascii_char = ASCII[L];
                    outputArr[py][px] = ascii_char;
                }
            }
        }
    }

    var a = "";
    for (var y = 0; y < SCREEN_HEIGHT; y = y + 1) {
        for (var x = 0; x < SCREEN_WIDTH; x = x + 1){
            a = a + outputArr[y][x];
    }
        print a;
        a = "";
    }
}

asciiDonut();`,
};