pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.53.0-noble'
        }
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }
}
