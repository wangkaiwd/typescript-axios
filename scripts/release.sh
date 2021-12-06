#!/usr/bin/env sh

# 执行结果不为true则退出
set -e
echo "Enter release version: "
# 从标准输入读取值，并赋值给$VERSION变量
read VERSION
# read -p： 给出提示符， -n 1 限定最多可以有1个字符可以作为有效读入， -r 禁止反斜线的转译功能
# 默认输入读取值会赋值给$REPLY
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
# echo 输出空值标识跳到一个新行
echo  # (optional) move to a new line
# 流程控制语句，如果满足执行then中的逻辑
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing $VERSION ..."

  # commit
  git add -A
  git commit -m "build: $VERSION"
  # 修改package.json中的version字段为$VERSION,并提交一条修改记录   
  npm version $VERSION --message "[release] $VERSION"
  git push

  # publish
  npm publish
fi
