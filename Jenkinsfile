pipeline {
    agent any

    tools {
        nodejs 'node18' 
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright install --with-deps'
                sh 'npx playwright test'
            }
        }
    }
}
