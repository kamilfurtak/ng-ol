pipeline {
    agent any

    stages {
        stage('install packages') {
            steps {
            nodejs(nodeJSInstallationName: '20.11.0') {
                    sh 'yarn install'
                }
            }
        }

        stage('build') {
            steps {
                            nodejs(nodeJSInstallationName: '20.11.0') {
                    sh 'yarn build:lib'
                sh 'cp -r dist/ngx-ol dist/ngx-ol-publish'
                sh 'yarn build:demo --base-href "/ngx-ol/"  --progress false'
                }

            }
        }

        // stage('Release: Github') {
        //     when {
        //         expression { return env.GIT_TAG_NAME =~ /^\d+.\d+.\d+-next.\d+$/ }
        //     }
        //     steps {
        //         // Assuming that you have already configured GitHub credentials in Jenkins
        //         withCredentials([string(credentialsId: 'github_oauth_token', variable: 'GITHUB_OAUTH_TOKEN')]) {
        //             sh '''
        //                 cd dist/ngx-ol-publish
        //                 cp ../../projects/ngx-ol/CHANGELOG.md CHANGELOG.md
        //                 npm pack
        //                 git tag ${env.GIT_TAG_NAME}
        //                 git push origin --tags
        //             '''
        //         }
        //     }
        // }

        // stage('Release: Github Pages') {
        //     when {
        //         expression { return env.GIT_TAG_NAME =~ /^\d+.\d+.\d+-next.\d+$/ }
        //     }
        //     steps {
        //         sh 'cd dist/demo-ngx-ol'
        //         // Implementation of deploying to GitHub Pages would depend on your specific setup
        //     }
        // }

        // stage('Deploy: NPM') {
        //     when {
        //         expression { return env.GIT_TAG_NAME =~ /^\d+.\d+.\d+-next.\d+$/ }
        //     }
        //     steps {
        //         withCredentials([usernamePassword(credentialsId: 'npm_credentials', usernameVariable: 'NPM_EMAIL', passwordVariable: 'NPM_TOKEN')]) {
        //             sh '''
        //                 cp projects/ngx-ol/CHANGELOG.md dist/ngx-ol-publish/CHANGELOG.md
        //                 cd dist/ngx-ol-publish
        //                 npm publish --tag next
        //             '''
        //         }
        //     }
        // }
    }
}