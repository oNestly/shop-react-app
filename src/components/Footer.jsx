function Footer() {
	return (
	<footer className="page-footer green lighten-3">
		<div className="footer-copyright">
			<div className="container">
				© {new Date().getFullYear()} oNestly
				<a className="grey-text text-lighten-4 right" href="https://github.com/oNestly/shop-react-app" target="_blank" rel='noreferrer'>Repo</a>
			</div>
		</div>
	</footer>
	)
}

export { Footer };