## [1.3.3](https://github.com/leafage-team/leafage/compare/v1.3.2...v1.3.3) (2025-09-14)


### Features

* **cli:** 优化命令行支持参数 ([9448500](https://github.com/leafage-team/leafage/commit/9448500aba58ad9b62c85fc4a5286d1b84559574))
* **cli:** 增加命令模块 ([53e952e](https://github.com/leafage-team/leafage/commit/53e952e23e99d186212a1ad0be6108334b4fd7f2))
* **example:** 删除无用文件 ([df39a78](https://github.com/leafage-team/leafage/commit/df39a7855a669b2bfa11aa3866092bfb575fb21b))
* **example:** 增加浏览器目标打包配置 ([0d2b4ce](https://github.com/leafage-team/leafage/commit/0d2b4ced7d4dceed5254e1e397360b3df8c6d301))
* **rspack:** 增加browserslist获取配置 ([4152aff](https://github.com/leafage-team/leafage/commit/4152aff59c1744428861680aa8e1489eceab6734))
* **toolkit:** 修改配置的合并方式 ([a0cf1a1](https://github.com/leafage-team/leafage/commit/a0cf1a14c55877ccff44b3acfd8cc898f9eb7c7e))
* **toolkit:** 修改配置的合并方式以及修改脚本的逻辑 ([0a8d4a0](https://github.com/leafage-team/leafage/commit/0a8d4a0a791d6914fb0fb48505257c9c82dba6df))
* **toolkit:** 修改配置的默认配置 ([b8d2303](https://github.com/leafage-team/leafage/commit/b8d23035571e45fdac8dd2157b40fb6d52d04590))
* **toolkit:** 增加加载env环境的方法并暴露出去 ([1fde0fd](https://github.com/leafage-team/leafage/commit/1fde0fda051cb860ffd3cacb80cdaaa3b7d2cb14))



## [1.3.2](https://github.com/leafage-team/leafage/compare/v1.3.1...v1.3.2) (2025-08-27)


### Features

* **example:** 去掉无用依赖项 ([65674f1](https://github.com/leafage-team/leafage/commit/65674f1decda6404a322840ad296dd1be6cab3be))
* **example:** 增加错误页面 ([2427145](https://github.com/leafage-team/leafage/commit/24271452181575c23463792311fdf8aa68e866f8))
* **example:** 增加样式文件 ([e79209b](https://github.com/leafage-team/leafage/commit/e79209b8c890273cbacae85ede9725d355d2c091))
* **renderer:** 方法名修改 ([767fa25](https://github.com/leafage-team/leafage/commit/767fa25535d1ec88fa7d35c2935f1a4db7f2c824))
* **renderer:** 将获取资源的方法统一封装 ([1579196](https://github.com/leafage-team/leafage/commit/15791966a1c53bc845871f904ea584bb1c81e165))
* **renderer:** 修改匹配规则的逻辑 ([4bf19a0](https://github.com/leafage-team/leafage/commit/4bf19a053fb84124ac3c7cb727ad7cb330efd2fe))
* **rspack:** 错误页面组件增加loader处理 ([cb7213f](https://github.com/leafage-team/leafage/commit/cb7213fb0f1d68889ac50d788795a078535c44e0))
* **rspack:** 设置生成css文件的条件 ([9e6e210](https://github.com/leafage-team/leafage/commit/9e6e210b7a390d438d8c1de988e7d9209b79c0fd))
* **rspack:** 升级rspack版本到1.5.0 ([15646af](https://github.com/leafage-team/leafage/commit/15646afb26f0abbc6f8db707ef6c112367ac4f13))
* **rspack:** 修改错误页面的实现方式 ([99f1d1c](https://github.com/leafage-team/leafage/commit/99f1d1ccf00faa5699ac50356bde74c7093c69d1))
* **rspack:** 修改进度条的颜色 ([1512c16](https://github.com/leafage-team/leafage/commit/1512c16c3ebf6f93d5d9071ea17ac4c99d48aa91))
* **rspack:** 修改loader规则以及external的加载顺序 ([cc89945](https://github.com/leafage-team/leafage/commit/cc89945139bdd5f1d2a4846fd54016528ae32b89))
* **rspack:** 增加设置别名预设 ([2f17578](https://github.com/leafage-team/leafage/commit/2f1757828379b7c8d0789c144adbaa46195f0a34))
* **rspack:** 增加搜索文件的方法 ([ee82083](https://github.com/leafage-team/leafage/commit/ee820834aa75ad87da1c5a8a6ea738a26dfbe7fb))
* **rspack:** 增加server文件打包 ([2de8b15](https://github.com/leafage-team/leafage/commit/2de8b154eff3ed47573d9f151e89b1df66741065))
* **rspack:** 支持普通样式导入 ([0575bb5](https://github.com/leafage-team/leafage/commit/0575bb57a47add326d0edd9fe795ca2ccb267bc3))
* **rspack:** cssModule导出方式修改 ([563211e](https://github.com/leafage-team/leafage/commit/563211e5eac4da2981a70d05d5d8a2276a073744))
* **server:** 加载server文件 ([6d7c7e6](https://github.com/leafage-team/leafage/commit/6d7c7e6170fffa8262204ae89701562a8d067ac6))
* **server:** 增加http代理配置 ([23727f2](https://github.com/leafage-team/leafage/commit/23727f2d6ea317813f87a63345b9e9c660cdbb8a))
* **toolkit:** 新增导入server模块方法 ([12e7988](https://github.com/leafage-team/leafage/commit/12e7988dd6ae6558d111d82a38440e32dc8df8aa))



## [1.3.1](https://github.com/leafage-team/leafage/compare/v1.3.0...v1.3.1) (2025-08-19)


### Features

* **build:** 手动定义包路径，根据顺序打包子包模块 ([d084d74](https://github.com/leafage-team/leafage/commit/d084d74989bc4a8ea53199f558167918ea8e9e78))
* **example:** 组件从主包中导入 ([c3277fc](https://github.com/leafage-team/leafage/commit/c3277fc4c6b3f203e51c20a0678ae124b4b4f024))
* **leafage:** 增加dev,build,start命令 ([19a9316](https://github.com/leafage-team/leafage/commit/19a9316f99ebc4ab2f3e434cde7a9e69dcbd163e))
* **leafage:** 主包增加组件导出 ([e473a49](https://github.com/leafage-team/leafage/commit/e473a49cacc0b63a0c5b6ba5a51edfe922b70297))
* **renderer:** 增加req的params参数返回 ([4ad164a](https://github.com/leafage-team/leafage/commit/4ad164aa6f2b2ee6833dae1f734e09a241c882ea))
* **server:** 增加默认params和query ([0fc2cbd](https://github.com/leafage-team/leafage/commit/0fc2cbd74cc4e7365ee03836da4b045db295feaf))
* **toolkit:** 增加获取配置的方法 ([bd94e48](https://github.com/leafage-team/leafage/commit/bd94e48673aaab90a818ab0ceaf1e83277c7ef13))



# 1.3.0 (2025-08-15)


### Features

* **build:** 打包方式统一改成用rollup ([fdfbcb3](https://github.com/leafage-team/leafage/commit/fdfbcb35271b477b5fe9411e9ad9acf2d059d20a))
* **build:** 修改项目的打包方式 ([c652eb5](https://github.com/leafage-team/leafage/commit/c652eb518e35e842a6ec039b35cc9026b023d0f3))
* **build:** 增加环境配置 ([f054ab8](https://github.com/leafage-team/leafage/commit/f054ab8a2ff2c8b37634b417804252ce43df05f1))
* **builder:** 整理配置以及打包路径修改 ([1feb042](https://github.com/leafage-team/leafage/commit/1feb042d93ee0d51feb0f0c26e91a59f3de1fc3a))
* **client:** 修改组件的参数 ([fda12ea](https://github.com/leafage-team/leafage/commit/fda12eae0e0b2310cae2ec42be64e8a6b52fcf70))
* **client:** 增加client包 ([ceabfab](https://github.com/leafage-team/leafage/commit/ceabfab7acc8c49c7309ec1d831345d68e040dc1))
* **component:** 去掉无用依赖库 ([37a5900](https://github.com/leafage-team/leafage/commit/37a59008e9d4c014fe68a593a88b380c669e0e8a))
* **component:** 修改包名@leafage/client为@leafage/component ([45fb0a3](https://github.com/leafage-team/leafage/commit/45fb0a3bbe0223e63331ae1fc5e81884acada0cf))
* **component:** 修改导出的方式 ([1389f63](https://github.com/leafage-team/leafage/commit/1389f63d79724ae4a99fc611a198294ec64d1760))
* **component:** 修改组件的属性名称 ([2e19c82](https://github.com/leafage-team/leafage/commit/2e19c8213c603bd2e14ae8223b542db08baadd46))
* **config:** 封装导入相关方法 ([8dcfc1f](https://github.com/leafage-team/leafage/commit/8dcfc1f7c37032944113d382933b4f47f20dec0a))
* **config:** 增加别名导入以及一些配置优化 ([9268998](https://github.com/leafage-team/leafage/commit/926899835b54c7aea9d1dadbea82c2fb7b1c0a43))
* **context:** 修改创建context的方式以及增加一些方法 ([3a8a33e](https://github.com/leafage-team/leafage/commit/3a8a33ed60cd97497dbd8bce25cd5aad2197faf5))
* **example:** 更新示例打包配置 ([5f459b5](https://github.com/leafage-team/leafage/commit/5f459b5b39c5f7701ba157e960737010a6703077))
* **example:** 修改示例的打包配置 ([969eec4](https://github.com/leafage-team/leafage/commit/969eec44ddb9451a7fc11c4b9a310eafbc402d2b))
* **example:** 修改示例项目的打包 ([a57cfca](https://github.com/leafage-team/leafage/commit/a57cfca7627f14495027144fa8467e42ee6c2870))
* **example:** 修改示例项目的配置 ([ede25f4](https://github.com/leafage-team/leafage/commit/ede25f45bd81c32f4587ad5cd9aa824fa7718af3))
* **example:** 增加标题显示 ([94dad14](https://github.com/leafage-team/leafage/commit/94dad14831ff77de3394da41d0ad6276033ac865))
* **example:** 增加脚本文件 ([624d90a](https://github.com/leafage-team/leafage/commit/624d90a92b1db4a59edefa9d7bead95b5e951072))
* **init:** project init and add config package ([62f2eab](https://github.com/leafage-team/leafage/commit/62f2eab3b9fb7a128e17be070544a8e79256150c))
* **leafage:** 修改leafage模块的实现方式以及增加一些导出 ([65be785](https://github.com/leafage-team/leafage/commit/65be7853d76f3884d5c8da7ccc5d167d5465e10d))
* **leafage:** 增加导出方法以及模块 ([57359a7](https://github.com/leafage-team/leafage/commit/57359a76a76f7356a3d0dbae4d183820939a5cf1))
* **leafage:** 增加上下文相关方法 ([ebfd262](https://github.com/leafage-team/leafage/commit/ebfd2627a73de678f8065207f0d65a9997b9f174))
* **leafage:** 增加leafage模块 ([956dea4](https://github.com/leafage-team/leafage/commit/956dea4515604584d677c7d004c931d3c2891eb1))
* **leafage:** 增加src目录的导入识别 ([7244c4b](https://github.com/leafage-team/leafage/commit/7244c4b60a2a03add53c0117ee5992cc6543ce1d))
* **package:** 增加核心包模块 ([0dadf8a](https://github.com/leafage-team/leafage/commit/0dadf8a268515fdc0689a7d7ecb89945d60c89f6))
* **package:** 增加清理dist命令 ([49b7d9d](https://github.com/leafage-team/leafage/commit/49b7d9d2beda1628550aba76d858b58497d30eff))
* **package:** 整理子包以及规范导出变量 ([b360ba1](https://github.com/leafage-team/leafage/commit/b360ba14d47aabf4ade0c7609e44e74e9212f06e))
* **renderer:** 实现渲染的基本逻辑 ([8e5f8af](https://github.com/leafage-team/leafage/commit/8e5f8af65812a77ab45e640def08dcdcf68cb6e0))
* **renderer:** 修改组件的属性传递 ([50488a8](https://github.com/leafage-team/leafage/commit/50488a877c44502c9d976e66908d1b9a64d5d708))
* **renderer:** 修改组件渲染的逻辑 ([8949413](https://github.com/leafage-team/leafage/commit/89494132e3b56184cb1bfded1cb27117041312a0))
* **renderer:** 修改props注水的方法处理 ([c18f699](https://github.com/leafage-team/leafage/commit/c18f69950900adde0fa230a1ef9b03c4caf2f0ac))
* **renderer:** 增加renderer模块 ([a9f828b](https://github.com/leafage-team/leafage/commit/a9f828b944075f832071d413902461f753a93414))
* **rspack:** 方法统一抽离到公共中 ([4edce5f](https://github.com/leafage-team/leafage/commit/4edce5fcb810921984b08c471fce912f86e17fe8))
* **rspack:** 将Error组件导出到客户端 ([e420476](https://github.com/leafage-team/leafage/commit/e420476bcbc749f29dc6c76a2dd5f8c07828a002))
* **rspack:** 入口加载代码优化 ([29fe9a7](https://github.com/leafage-team/leafage/commit/29fe9a718c097db0d8cd97bd1ad5e3fb0c895b33))
* **rspack:** 使用rspack-manifest-plugin替换webpack-manifest-plugin ([8f24a8c](https://github.com/leafage-team/leafage/commit/8f24a8ce40f86dc174b6e2c1369b45d95a468198))
* **rspack:** 修改入口加载器的实现方式 ([c55fb7c](https://github.com/leafage-team/leafage/commit/c55fb7c7e0efaef188a24f40d4327247086e1ed1))
* **rspack:** 修改fs的获取方式 ([c63066a](https://github.com/leafage-team/leafage/commit/c63066a3d7fcf9c633a2b4994b65d5ba23856b75))
* **rspack:** 增加打包的逻辑 ([3917bdf](https://github.com/leafage-team/leafage/commit/3917bdfc00558821e4456e821468046da8a93283))
* **rspack:** 增加环境变量、自动导入外部文件、loader引用优化以及删除无用依赖包 ([ffb237c](https://github.com/leafage-team/leafage/commit/ffb237cf3b5e3fdaded00eae922519e43d9625c6))
* **rspack:** 增加热更新以及属性取值获取 ([41705a7](https://github.com/leafage-team/leafage/commit/41705a76977fa6d93a986ac46ae7ce675a3bc508))
* **rspack:** 增加事件以及修改创建mfs的方式 ([577a7ac](https://github.com/leafage-team/leafage/commit/577a7acfb038d3c148f7c17a4f6c8df9ae33defb))
* **rspack:** 增加rspack打包配置模块 ([998f57a](https://github.com/leafage-team/leafage/commit/998f57aa146486628850167f161df3ad52bb047f))
* **rspack:** CSS Modules支持通过默认导入整个样式 ([fa9219d](https://github.com/leafage-team/leafage/commit/fa9219df4b8af0f66154122adb6b16f96fb7d971))
* **server:** 初步完成server模块 ([2f99a74](https://github.com/leafage-team/leafage/commit/2f99a74a3fbb9763286c74c3f5f18b2c6806b381))
* **server:** 修改文件名以及解决方法调用失败问题 ([e198d10](https://github.com/leafage-team/leafage/commit/e198d10bc8abec1f6f8c8c43e2957e00d1cd7c13))
* **server:** 修改server模块的实现方式 ([3474d81](https://github.com/leafage-team/leafage/commit/3474d81f2b71de0d87c8eae1e9502203d09361ad))
* **server:** 增加cjs的打包配置 ([bec0299](https://github.com/leafage-team/leafage/commit/bec0299f8e4030a312c437f3a33d282d886158d5))
* **server:** 增加server模块 ([0507154](https://github.com/leafage-team/leafage/commit/0507154c15ac79bf10648f6aaf669ec30c35490f))
* **simple:** 删除无用依赖 ([254dfe8](https://github.com/leafage-team/leafage/commit/254dfe832c97fe1ffad21d5a1757d6a073f64383))
* **simple:** 增加示例模块 ([de85f82](https://github.com/leafage-team/leafage/commit/de85f824b9ab99083a3ee47e87f4d7e59a6ed463))
* **toolkit:** 导入函数返回值修改 ([be9e556](https://github.com/leafage-team/leafage/commit/be9e556c1cc8d11ffa97a93e317d608fa28ed189))
* **toolkit:** 将applyPresets方法统一抽离 ([ca1a38e](https://github.com/leafage-team/leafage/commit/ca1a38ea772657ed9d691b3e920688c25d4ae05b))
* **toolkit:** 修改静态资源目录的配置 ([289f86b](https://github.com/leafage-team/leafage/commit/289f86b0a3146ccceb7384d464635a8f35623752))
* **toolkit:** 修改模块加载的方法函数实现 ([e2f9142](https://github.com/leafage-team/leafage/commit/e2f9142b5419bd69062527e5256bed526d7c9721))
* **toolkit:** 增加日志方法 ([fc140a5](https://github.com/leafage-team/leafage/commit/fc140a58999707c16121bf4f2e0d7ddb774dc76b))
* **toolkit:** 增加数组转换方法 ([5403543](https://github.com/leafage-team/leafage/commit/5403543a3ceca54c325ca6cdc3473716d192885f))
* **toolkit:** 增加页面文件的正则glob ([31bb17e](https://github.com/leafage-team/leafage/commit/31bb17e1268cc80f76e0216450d1caf66aa51500))
* **webpack:** 删除webpack模块使用rspack实现 ([aa1ddf4](https://github.com/leafage-team/leafage/commit/aa1ddf4529505a2ae3a570adc01185facd169d59))
* **webpack:** 增加webpack模块 ([100c95e](https://github.com/leafage-team/leafage/commit/100c95e0f4f073ad56fe6a8a5870bcb3787530a2))



