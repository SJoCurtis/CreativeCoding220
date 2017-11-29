var colorCodes = ["#000","#807f29","#c0c0c0"]; // the real arrays are much longers

var c = document.getElementById('c');
var context = c.getContext("2d");
var centerx = context.canvas.width / 2;
var centery = context.canvas.height / 2;

$('#draw').click(function()
{
a = parseFloat($('#a').val());
    b = parseFloat($('#b').val()); //The user can define Cosinus and Sinus

    context.clearRect(0, 0, 600, 600);
context.beginPath();
context.moveTo(centerx, centery);

for (var beg = 0, end = lengthOfColors.length; beg < end; beg++)
  {
  for (i = 0; i < lengthOfColors[beg]; i++)
    {
    angle = 0.1 * i;//Angle of line rotation = 0.1
    x = centerx + (a * angle) * Math.cos(angle);
    y = centery + (b * angle) * Math.sin(angle);
    context.lineTo(x, y);
    }
  context.strokeStyle = colorCodes[beg];
  context.stroke();//draw the path
  };
});
