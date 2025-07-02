pipeline {
    agent any

    stages {
        stage('Run Playwright Tests') {
            steps {
                sh 'docker-compose run --rm playwright-tests npx playwright test'
            }
        }
    }
}
