Maven 多模块结构
--------------------------
    父模块
     <packaging>pom</packaging>
     <modules>
            <module>backend</module>
            <module>frontend</module>
     </modules>
Spring Initializr 创建backend模块
--------------------------
    添加 restful api
    @RestController
    public class HelloController {
        @GetMapping("/api/hello")
        public String hello() {
            return "Hello, the time at the server is now " + new Date() + "\n";
        }
    }

 frontend模块
 --------------------------
### vue cli 脚手架创建
    npm install -g @vue/cli
    vue create frontend
    
###  安装axios，vue-axios
    npm install axios
    npm install vue-axios
###封装axios
    src目录下创建util、api文件夹
    http.js封装axios，
        处理axios中对请求拦截和响应拦截做处理
        可token处理（未加）
        可引入加载动画（未加）
    为了方便api的调用，我们需要将其挂载到vue的原型上。在main.js中：
        import api from './api' // 导入api接口
        Vue.prototype.$api = api; // 将api挂载到vue的原型上
        然后我们可以在页面中这样调用接口，eg：
        methods: {    
            onLoad(id) {      
                this.$api.hello.get().then(res=> {
                    // 执行某些操作      
                })    
            }  
        }
    也可结合 vue-axios使用
        在入口main.js中        
        import axios from 'axios'
        import VueAxios from 'vue-axios'
        Vue.use(VueAxios,axios);
        之后就可以全局使用this.axios了，在组件文件中的methods里去使用了        
        getNewsList(){
              this.axios.get('api/getNewsList').then((response)=>{
                this.newsList=response.data.data;
              }).catch((response)=>{
                console.log(response);
              })
            }

### 实时更新后台的接口
     data:function(){
          return {
              hello:null
          }
        },
        mounted: function(){
            this.setHello();
        },
        methods : {
            setHello : function(){
                let  _this=this;
                _this.intervalid1 = setInterval(function(){
                    _this.$api.hello.get().then((res)=>{
                        _this.hello=res.data;
                    })
                }, 250);
            }
        },
### vue开发模式下，代理设置
        // vue.config.js
        module.exports = {
            // https://cli.vuejs.org/zh/config/#devserver-proxy
          devServer: {
            port: 9090,
            proxy: {
              '/api': {
                target: 'http://localhost:8080', //请求本地
                ws: false,
                changeOrigin: true
              }
            }
          }
        }
         
前后端统一一键打包部署，非分离部署
-------------------------------------------
### frontend-maven-plugint 一键编译，maven-antrun-plugin自动复制

     <plugin>
                    <groupId>com.github.eirslett</groupId>
                    <artifactId>frontend-maven-plugin</artifactId>
                    <version>1.6</version>
                    <configuration>
                        <workingDirectory>./</workingDirectory>
                        <installDirectory>target</installDirectory>
                    </configuration>
                    <executions>
                        <execution>
                            <id>install node and npm</id>
                            <goals>
                                <goal>install-node-and-npm</goal>
                            </goals>
                            <configuration>
                                <nodeVersion>v10.16.0</nodeVersion>
                                <npmVersion>6.9.0</npmVersion>
                            </configuration>
                        </execution>
                        <execution>
                            <id>npm install</id>
                            <goals>
                                <goal>npm</goal>
                            </goals>
                            <configuration>
                                <arguments>install</arguments>
                            </configuration>
                        </execution>
                        <execution>
                            <id>npm run build</id>
                            <goals>
                                <goal>npm</goal>
                            </goals>
                            <configuration>
                                <arguments>run build</arguments>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
    
                <plugin>
                    <artifactId>maven-antrun-plugin</artifactId>
                    <executions>
                        <execution>
                            <phase>generate-resources</phase>
                            <configuration>
                                <target>
                                    <!-- 打印信息 -->
                                    <echo message="删除复制前端编译文件" />
                                    <!-- 删除文件夹 -->
                                    <delete dir="../backend/src/main/resources/public" />
                                    <copy todir="../backend/src/main/resources/public">
                                        <fileset dir="${project.basedir}/dist"/>
                                    </copy>
                                    <copy tofile="../backend/src/main/resources/templates/index.html" file="${project.basedir}/dist/index.html" overwrite="true">
                                    </copy>
                                </target>
                            </configuration>
                            <goals>
                                <goal>run</goal>
                            </goals>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
### backend下运行mvn clean install
    