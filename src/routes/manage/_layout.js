import { Row, Col } from 'antd'
import styles from './_layout.css'
import NavLeft from './components/NavLeft'
import Header from './components/Header'
import Footer from './components/Footer'

function BasicLayout(props) {
	return (
		<div>
			<Row className={styles.container}>
				<Col span={4} className={styles.nav_left}>
					<NavLeft/>
				</Col>
				<Col span={20} className={styles.main}>
					<Header/>
					<Row className={styles.content}>
						{props.children}
					</Row>
					<Footer/>
				</Col>
			</Row>
		</div>
	)
}

export default BasicLayout;
