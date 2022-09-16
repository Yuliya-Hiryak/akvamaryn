import { useState } from 'react';
import {
  Button,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import  MUIDataTable  from 'mui-datatables';
import { Octokit } from 'octokit';
import Header from './Header';
import BackdropCircular from './BackdropCircular';

const Layout = () => {
  const [isLoading, setLoading] = useState(false)
  const [prNumber, setPRNumber] = useState('')
  const [repo, setRepo] = useState('shop-manager')
  const [data, setData] = useState([])

  const octokit = new Octokit({
    auth:  process.env.REACT_APP_API_KEY
  })

  const handleFetchData = async () => {
    if (!prNumber) return;
    setLoading(true)
    try {
      const {data} = await octokit.request(`GET /repos/{owner}/{repo}/pulls/{pull_number}/commits`, {
        owner: 'JOyakawa1',
        repo,
        pull_number: prNumber
      })
      setData(data)
    } catch (e) {
      console.log('Error! =>', e)
      setData('')
    }
    setLoading(false)
  }

  const columns = [
    {
      name: 'increment',
      label: '#',
      options: {
        filter: false,
        sort: false,
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
              {dataIndex + 1}
            </>
          );
        }
      }
    },
    {
      name: 'author.login',
      label: 'Author'
    },
    {
      name: 'commit.message',
      label: 'Commit Message'
    }
  ]

  return (
    <>
      <Header />
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              name="repo"
              label="Repository"
              select
              value={repo}
              onChange={(event) => setRepo(event.target.value)}
            >
              <MenuItem value="shop-manager">Shop Manager Front</MenuItem>
              <MenuItem value="shop-manager-api">Shop Manager Back</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              name="setPRNumber"
              label="Pull Request Number"
              value={prNumber}
              onChange={(event) => setPRNumber(event.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleFetchData}
            >
              Get Data
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Container sx={{mt: 5}}>
        {!!data.length
          ?
          <>
          <MUIDataTable
            title={''}
            data={data}
            columns={columns}
            options={{
              filter: true,
              filterType: 'textField',
              responsive: 'simple',
              expandableRowsHeader: false,
              expandableRowsOnClick: true,
              enableNestedDataAccess: ".",
              selectableRows: 'none',
              print: false,
              download: true,
              rowsPerPageOptions: [10, 20, 40, 80, 100]
            }}
          />
          </>
          :
          <Typography variant="h6">No data available! Check repo name and PR number and click 'Get Data' button</Typography>
        }
      </Container>
      <BackdropCircular loading={isLoading} />
    </>
  );
};
export default Layout;

