pipeline {
    agent { dockerfile true }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'Already build 😅'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
    }
}