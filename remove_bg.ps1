Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("public\hero-glass.png")
$bmp = New-Object System.Drawing.Bitmap($img)
$img.Dispose()
$bmp.MakeTransparent([System.Drawing.Color]::Black)
$bmp.Save("public\hero-glass.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()
