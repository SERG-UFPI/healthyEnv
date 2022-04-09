import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import styles from '../styles/Home.module.css'
import SelectRepo from '../components/SelectRepo'

export default function Home() {
  return (
    <div>
      <Header />
      <SelectRepo />
    </div>
  )
}
