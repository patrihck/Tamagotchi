#!groovy

def isDeploymentBranch(branch) {
  branch =~ /^master|develop-[0-9]$/
}

def PORT = 3001;

node {
    def containerName = "tamagotchi_${env.BRANCH_NAME}"
    def imageName = "tamagotchi-server:${env.BRANCH_NAME}"

    currentBuild.result = "SUCCESS"

    try {

        stage('Checkout') {
            checkout scm
        }

        stage('Build && Test') {
            docker.build("tamagotchi-server:${env.BUILD_ID}", "--build-arg port=${PORT} .").inside {
                sh 'make build test'
            }
        }

        if (isDeploymentBranch(env.BRANCH_NAME)) {
            stage('Create image') {
                sh "make image TAG=${env.BRANCH_NAME} PORT=${PORT}"
            }

            stage('Run container') {
                def containerExists = sh (script: "docker ps -f \"name=${containerName}\" --format '{{.Names}}'", returnStdout: true).trim()

                if (containerExists) {
                    sh "docker stop ${containerName}"
                    sh "docker rm ${containerName}"
                }

                sh "docker run -e PORT=${PORT} --name ${containerName} -p ${PORT}:${PORT} -d ${imageName}"
            }
        }

        stage('Cleanup') {
            def imageExists = sh (script: "docker images --filter=reference='tamagotchi-*:${env.BUILD_ID}' --format '{{.Repository}}'", returnStdout: true).trim()

            if (imageExists) {
                sh "docker rmi tamagotchi-server:${env.BUILD_ID}"
            }
        }

    }
    catch (err) {

        currentBuild.result = "FAILURE"

        throw err
    }
}