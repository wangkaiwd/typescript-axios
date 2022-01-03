## Publish

### generate changelog

* [conventional-changelog-cli](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-cli)

### github release

* [GitHub Automatic Release](https://github.com/marketplace/actions/automatic-releases#github-automatic-releases)

### Resource

* [private](https://docs.npmjs.com/cli/v6/configuring-npm/package-json#private)
* [keeping files out of your package](https://docs.npmjs.com/cli/v8/using-npm/developers#keeping-files-out-of-your-package)
* [npm version](https://docs.npmjs.com/cli/v8/commands/npm-version)
  * [Pre & Post Scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts#pre--post-scripts)
* npm publish
  * publish beta version
  * publish scoped package
  * npm unpublish
* npm pack(look published file in npm)
  * online tool

### Problem

* error tip not friendly
* git tag
* git push --tag

can switch different version source code by tag

### publish steps

1. build source code
2. npm run version
3. generate changelog(**it would take advantage of new version in package.json**)
4. commit changes of `package.json`,`package-lock.json` and `changelog.md`
5. git push
6. git push origin <tag>
7. npm publish --reg https://registry.npmjs.org
   * [publishConfig](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#publishconfig)
8. generate github release
