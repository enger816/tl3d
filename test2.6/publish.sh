#原生打包工程根目录，layanative会读取根目录下到native.json到配置，使用配置路径到目录作为生成目录
nativepath=/Users/enger/bingo/tl3d/test2.6/release/native

echo 'package path:'$nativepath
#发布h5
gulp

#发布小游戏
# cp -r ./release/web/js/bundle.js ./release/wxgame/js/bundle.js

#发布安卓
rm -rf $nativepath/android_studio/app/src/main/assets/cache/stand.alone.version/*  #清理缓存目录
layanative2 refreshres -p android_studio  --path  $nativepath

#发布ios
# rm -rf $nativepath/wkwebview/resource/cache/stand.alone.version/* #清理缓存目录
# layanative2 refreshres -p wkwebview  --path $nativepath